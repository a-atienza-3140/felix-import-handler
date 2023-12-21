import { createClient } from "@supabase/supabase-js";

const client = () =>
  createClient(
    "https://lenzfmzjjrmwtvcosunt.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlbnpmbXpqanJtd3R2Y29zdW50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg3NTYyMjAsImV4cCI6MjAxNDMzMjIyMH0.XGARxVls1nVCk1qV2KbMTdxZrP3f48Kwpp3ahrSWxCU",
  );

export const supabaseClient = client();
