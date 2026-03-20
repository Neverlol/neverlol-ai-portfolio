import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if(!supabaseUrl || !supabaseKey) { console.error("No url/key"); process.exit(1); }

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error } = await supabase.from('projects').select('id, title, created_at').eq('id', 'tableau-bi');
  console.log("Projects found with id=tableau-bi:", data, "Error:", error);
  
  const { data: all_data } = await supabase.from('projects').select('id, title');
  console.log("All projects in DB:", all_data);
}

check();
