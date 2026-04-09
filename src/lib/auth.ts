import { auth } from './firebase'
import { signOut as firebaseSignOut, signInWithEmailAndPassword } from 'firebase/auth'

// Firebase 在 Server Side 的 Session 检查 (简易版)
export async function getSession() {
  // 注意：在实际生产中，Firebase 推荐使用 Session Cookies
  // 但对于个人门户的 Admin 权限，我们可以暂时通过 Client-side 检查
  // 此时返回 getAuth().currentUser 或者在 Client Component 中使用 useAuth
  return auth.currentUser
}

// 退出登录
export async function signOut() {
  try {
    await firebaseSignOut(auth)
    return { success: true }
  } catch (error: unknown) {
    return { error: error instanceof Error ? error.message : 'Sign out failed' }
  }
}

// 登录函数：使用 Firebase 账号密码
export async function signIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return { user: userCredential.user }
  } catch (error: unknown) {
    return { error: error instanceof Error ? error.message : 'Sign in failed' }
  }
}
