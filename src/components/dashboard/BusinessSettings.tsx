import React, { useState } from 'react';
import { Building, Link as LinkIcon, Plus, Trash2 } from 'lucide-react';
import { useBusinessStore } from '../../store/businessStore';
import { Button } from '../ui/Button';
import { toast } from 'sonner';
import { Location } from '../../types';

export const BusinessSettings = () => {
  const { businesses, setBusinesses } = useBusinessStore();
  const business = businesses[0]; // For now, we'll just use the first business
  const [editingLocationId, setEditingLocationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [newLocation, setNewLocation] = useState<Partial<Location> | null>(null);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);

  const handleStartEditing = (location: Location) => {
    setEditingLocationId(location.id);
    setEditingLocation({ ...location });
  };

  const handleCancelEditing = () => {
    setEditingLocationId(null);
    setEditingLocation(null);
  };

  const handleUpdateLocation = async () => {
    if (!editingLocation) return;
    
    setLoading(true);
    try {
      const updatedBusinesses = businesses.map(b => {
        if (b.id === business.id) {
          return {
            ...b,
            locations: b.locations.map(loc => 
              loc.id === editingLocation.id ? editingLocation : loc
            )
          };
        }
        return b;
      });
      setBusinesses(updatedBusinesses);
      setEditingLocationId(null);
      setEditingLocation(null);
      toast.success('Location updated successfully');
    } catch (error) {
      toast.error('Failed to update location');
    } finally {
      setLoading(false);
    }
  };

  const handleAddLocation = () => {
    setNewLocation({
      name: '',
      address: '',
      reviewLink: ''
    });
  };

  const handleSaveNewLocation = async () => {
    if (!newLocation?.name || !newLocation.address || !newLocation.reviewLink) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const newLoc: Location = {
        id: String(Date.now()),
        businessId: business.id,
        name: newLocation.name,
        address: newLocation.address,
        googlePlaceId: 'new_id',
        reviewLink: newLocation.reviewLink,
        qrCode: 'data:image/png;base64,demo-qr-code'
      };

      const updatedBusinesses = businesses.map(b => {
        if (b.id === business.id) {
          return {
            ...b,
            locations: [...b.locations, newLoc]
          };
        }
        return b;
      });

      setBusinesses(updatedBusinesses);
      setNewLocation(null);
      toast.success('Location added successfully');
    } catch (error) {
      toast.error('Failed to add location');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLocation = async (locationId: string) => {
    if (business.locations.length <= 1) {
      toast.error('Cannot delete the last location');
      return;
    }

    setLoading(true);
    try {
      const updatedBusinesses = businesses.map(b => {
        if (b.id === business.id) {
          return {
            ...b,
            locations: b.locations.filter(loc => loc.id !== locationId)
          };
        }
        return b;
      });
      setBusinesses(updatedBusinesses);
      toast.success('Location deleted successfully');
    } catch (error) {
      toast.error('Failed to delete location');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center justify-between">
          <div className="flex items-center">
            <Building className="h-5 w-5 mr-2" />
            Business Settings
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={handleAddLocation}
            disabled={!!newLocation}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Location
          </Button>
        </h3>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Business Name
            </label>
            <p className="mt-1 text-sm text-gray-900">{business.name}</p>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Locations
            </label>
            
            {newLocation && (
              <div className="border rounded-md p-4 bg-gray-50">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Location Name
                    </label>
                    <input
                      type="text"
                      value={newLocation.name}
                      onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <input
                      type="text"
                      value={newLocation.address}
                      onChange={(e) => setNewLocation({ ...newLocation, address: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Google Review Link
                    </label>
                    <input
                      type="text"
                      value={newLocation.reviewLink}
                      onChange={(e) => setNewLocation({ ...newLocation, reviewLink: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setNewLocation(null)}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={handleSaveNewLocation}
                      loading={loading}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {business.locations.map((location) => (
              <div key={location.id} className="border rounded-md p-4">
                <div className="space-y-4">
                  {editingLocationId === location.id && editingLocation ? (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Location Name
                        </label>
                        <input
                          type="text"
                          value={editingLocation.name}
                          onChange={(e) => setEditingLocation({
                            ...editingLocation,
                            name: e.target.value
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Address
                        </label>
                        <input
                          type="text"
                          value={editingLocation.address}
                          onChange={(e) => setEditingLocation({
                            ...editingLocation,
                            address: e.target.value
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Google Review Link
                        </label>
                        <input
                          type="text"
                          value={editingLocation.reviewLink}
                          onChange={(e) => setEditingLocation({
                            ...editingLocation,
                            reviewLink: e.target.value
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleCancelEditing}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          variant="primary"
                          onClick={handleUpdateLocation}
                          loading={loading}
                        >
                          Update
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">{location.name}</h4>
                          <p className="mt-1 text-sm text-gray-500">{location.address}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStartEditing(location)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteLocation(location.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <LinkIcon className="h-4 w-4" />
                        <span className="truncate">{location.reviewLink}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};