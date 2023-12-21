"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabaseClient = void 0;
var supabase_js_1 = require("@supabase/supabase-js");
var client = function () {
    return (0, supabase_js_1.createClient)("https://lenzfmzjjrmwtvcosunt.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlbnpmbXpqanJtd3R2Y29zdW50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg3NTYyMjAsImV4cCI6MjAxNDMzMjIyMH0.XGARxVls1nVCk1qV2KbMTdxZrP3f48Kwpp3ahrSWxCU");
};
exports.supabaseClient = client();
