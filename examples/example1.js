import DXFWriter from "../lib/DXFWriter";
import * as fs from 'fs';

const dxf = new DXFWriter();
dxf.addLine(0, 0, 100, 100);
var bName = "test2";
var bl = dxf.addBlock(bName);
bl.flag = 2;
bl.model.addLine(10, 10, 100, 100);
bl.model.addAttribute("testAtr", 0, 0, 0);

var ins = dxf.addInsert("test2", 0, 0);
//ins.addAttribute("testAtr", "tt222");

fs.writeFileSync('examples/example1.dxf', dxf.stringify());