import express, { Request, Response } from "express";
import getConnection from "./connection";
import { FieldPacket, RowDataPacket } from "mysql2";
import fs from "fs";
const app = express();

interface BobInfo extends RowDataPacket {
  id: number;
  day: string;
  menu: string;
}

type DataSet<T> = [T[], FieldPacket[]];

app.get("/", async (req: Request, res: Response) => {
  try {
    const conn = await getConnection();
    try {
      const getQuery = "SELECT menu, day FROM bob ORDER BY day DESC LIMIT 1";
      const [thatDayData]: DataSet<BobInfo> = await conn.query(getQuery);
      conn.release();
      const returnData = JSON.parse(thatDayData[0].menu);
      return res.json(returnData);
    } catch (e) {
      console.log(e);
      conn.release();
    }
  } catch (e) {
    console.log(e);
  }
});

app.get("/download", async (req: Request, res: Response) => {
  const filepath = `${__dirname}/releaseFile/GNU_BOB_v1.3.3.zip`;
  const filename = "GNU_BOB_v1.3.3.zip";

  console.log("다운했습니다.");
  if (fs.existsSync(filepath)) {
    res.download(filepath, filename);
  } else {
    res.status(403).send("해당 파일이 존재하지 않음");
  }
});

app.listen(3000, () => {
  console.log("server start in 3000 port");
});
