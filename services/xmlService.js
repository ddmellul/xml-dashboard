import fs from "fs";
import xml2js from "xml2js";

const parser = new xml2js.Parser();

export async function getJsonFromXml() {
  const xml = fs.readFileSync("./data/buildings.xml", "utf-8");
  return await parser.parseStringPromise(xml);
}
