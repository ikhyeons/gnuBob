import { FieldPacket, RowDataPacket } from "mysql2";
import getConnection from "./connection";
import getBobFunc from "./getBobFunc";
import schedule from "node-schedule";

getBob();

const job = schedule.scheduleJob("0 0 6 * * *", async () => {
  getBob();
});

import express, { Request, Response } from "express";
import fs from "fs";
const app = express();

interface BobInfo extends RowDataPacket {
  id: number;
  day: string;
  menu: string;
}

app.get("/", async (req: Request, res: Response) => {
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
});

app.get("/download", async (req: Request, res: Response) => {
  const filepath = `${__dirname}/releaseFile/GNU_BOB_v1.3.5.zip`;
  const filename = "GNU_BOB_v1.3.5.zip";

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

//get bob functionㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

interface DayInBob extends RowDataPacket {
  day: string;
}

type DataSet<T> = [T[], FieldPacket[]];

async function getBob() {
  const conn = await getConnection();

  //확인로직
  let today = new Date();
  let year1 = today.getFullYear(); // 년도
  let month1 = today.getMonth() + 1; // 월
  let date1 = today.getDate(); // 날짜
  console.log("오늘날짜 : ", year1, month1, date1);
  const getQuery = "SELECT day FROM bob ORDER BY day DESC LIMIT 1";
  const [thatDayData]: DataSet<DayInBob> = await conn.query(getQuery);

  let thatDay = new Date(thatDayData[0].day);
  let year2 = thatDay.getFullYear(); // 년도
  let month2 = thatDay.getMonth() + 1; // 월
  let date2 = thatDay.getDate(); // 날짜

  if (year1 == year2 && month1 == month2 && date1 == date2) {
    console.log("이미 이번 주 밥을 저장했습니다.");
    conn.release();
  } else {
    //입력 로직
    const bobData = await getBobFunc();
    const bobString = JSON.stringify(bobData);
    const query = "INSERT INTO bob values(DEFAULT, DEFAULT, ?)";
    await conn.query(query, [bobString]);
    conn.release();
  }
  conn.release();
}
