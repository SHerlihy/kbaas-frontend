import { describe, expect, it } from 'vitest';
const fs = require('fs').promises;
import { xml2json } from "xml-js";

async function getXmlString(xmlFilePath: string): Promise<[undefined, string] | [Error]> {
    try{
    const xmlString = await fs.readFile(`${__dirname}/${xmlFilePath}`, 'utf8')
        return [undefined, xmlString]
    } catch (err) {
        return [err]
    }
}

describe("xml to json", ()=>{
    it("returns get response json", async ()=> {
            const [err, xmlString] = await getXmlString('./get.xml');
            if (err) {
                throw err
            }
            
            const getJson = xml2json(xmlString)
            console.log(getJson)
    })
})
