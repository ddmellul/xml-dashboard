import express from "express";
import { getJsonFromXml } from "./services/xmlService.js";
import { encrypt } from "./services/cryptoService.js";

const app = express();
const PORT = 3000;

app.use(express.static("public"));

function normalize(xml) {
  return (xml.buildings?.building || []).map(b => ({
    name: b.name?.[0],
    location: b.location?.[0],
    systems: (b.systems?.[0]?.system || []).map(s => ({
      name: s.name?.[0],
      sensors: (s.sensor || []).map(sensor => ({
        name: sensor.name?.[0],
        value: sensor.value?.[0]
      }))
    }))
  }));
}

app.get("/api/data", async (req, res) => {
  const raw = await getJsonFromXml();
  const clean = normalize(raw);
  res.json(clean);
});

app.get("/api/data-secure", async (req, res) => {
  const raw = await getJsonFromXml();
  const clean = normalize(raw);
  const encrypted = encrypt(clean);
  res.json({ payload: encrypted });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
