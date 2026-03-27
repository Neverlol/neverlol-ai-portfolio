import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, collection, addDoc } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function migrate() {
  console.log('🏗️ Starting Data Migration to Firebase...');

  // 1. Migrate Comments
  const commentsPath = path.join('backups', 'supabase', 'comments.json');
  if (fs.existsSync(commentsPath)) {
    const comments = JSON.parse(fs.readFileSync(commentsPath, 'utf-8'));
    for (const comment of comments) {
      const { id, ...data } = comment;
      await setDoc(doc(db, 'comments', id), {
        ...data,
        updated_at: new Date().toISOString()
      }, { merge: true });
      console.log(`✅ Migrated comment: ${id}`);
    }
  }

  // 2. Migrate Sandbox Configs
  const sandboxPath = path.join('backups', 'supabase', 'sandbox_configs.json');
  if (fs.existsSync(sandboxPath)) {
    const configs = JSON.parse(fs.readFileSync(sandboxPath, 'utf-8'));
    for (const config of configs) {
      const { id, ...data } = config;
      await setDoc(doc(db, 'sandbox_configs', id), {
        ...data,
        updated_at: new Date().toISOString()
      }, { merge: true });
      console.log(`✅ Migrated sandbox_config: ${id}`);
    }
  }

  console.log('\n✨ Migration Complete!');
}

migrate().catch(console.error);
