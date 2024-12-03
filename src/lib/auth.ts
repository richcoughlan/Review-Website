import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'sonner';
import { auth, db, googleProvider } from './firebase';
import { useAuthStore } from '../store/authStore';

export const signUp = async (email: string, password: string, name: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });
    
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email,
      name,
      role: 'business',
      createdAt: new Date().toISOString()
    });

    toast.success('Account created successfully!');
  } catch (error: any) {
    const errorMessage = error.code === 'auth/email-already-in-use' 
      ? 'Email already in use. Please try signing in instead.'
      : error.message || 'Failed to create account';
    toast.error(errorMessage);
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success('Successfully signed in!');
  } catch (error: any) {
    const errorMessage = error.code === 'auth/invalid-credential'
      ? 'Invalid email or password'
      : error.message || 'Failed to sign in';
    toast.error(errorMessage);
    throw error;
  }
};

export const signInWithGoogle = async () => {
  try {
    await signInWithRedirect(auth, googleProvider);
  } catch (error: any) {
    console.error('Google sign in error:', error);
    toast.error('Failed to sign in with Google');
    throw error;
  }
};

export const handleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result?.user) {
      await setDoc(doc(db, 'users', result.user.uid), {
        email: result.user.email,
        name: result.user.displayName,
        role: 'business',
        createdAt: new Date().toISOString()
      }, { merge: true });
      
      toast.success('Successfully signed in with Google!');
    }
  } catch (error) {
    console.error('Error handling redirect result:', error);
    toast.error('Failed to complete Google sign-in');
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    toast.success('Successfully signed out!');
  } catch (error: any) {
    console.error('Sign out error:', error);
    toast.error('Failed to sign out');
    throw error;
  }
};

export const initializeAuth = () => {
  useAuthStore.getState().setLoading(true);
  
  // Handle any pending redirect result
  handleRedirectResult().catch(console.error);

  // Set up auth state listener
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      useAuthStore.getState().setUser({
        id: user.uid,
        email: user.email!,
        name: user.displayName || 'User',
        role: 'business'
      });
    } else {
      useAuthStore.getState().setUser(null);
    }
    useAuthStore.getState().setLoading(false);
  });
};