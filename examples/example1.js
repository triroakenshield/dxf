import DXFWriter from "../lib/DXFWriter";
import * as fs from 'fs';

const dxf = new DXFWriter();
dxf.addLine(0, 0, 100, 100);
var bl = dxf.addBlock("test2");
bl.model.addLine(10, 10, 100, 100);

fs.writeFileSync('examples/example1.dxf', dxf.stringify());