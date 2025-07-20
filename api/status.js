const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).send("Only POST allowed");

  const { device_id, command } = req.body;
  const { error } = await supabase
    .from("commands")
    .update({ status: "executed" })
    .eq("device_id", device_id)
    .eq("command", command)
    .eq("status", "pending");

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json({ status: "command marked executed" });
};