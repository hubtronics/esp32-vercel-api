const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

module.exports = async (req, res) => {
  if (req.method !== "GET") return res.status(405).send("Only GET allowed");

  const device_id = req.query.device_id;
  const { data, error } = await supabase
    .from("commands")
    .select("*")
    .eq("device_id", device_id)
    .eq("status", "pending")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error) return res.status(500).json({ error: error.message });
  if (!data) return res.status(200).json({ command: null });

  res.status(200).json({ command: data.command });
};