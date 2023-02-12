import axios from "axios";
import { IRegistData } from "components/study-manage/ModalCalendarRegist";

const BASE_URL = `https://i8b205.p.ssafy.io/be-api/studies`;
// const BASE_URL = `/be-api/studies`;

const token = localStorage.getItem("kakao-token");

// 일정 조회
export async function calendarSelectAllApi() {
  try {
    const response = await fetch(`${BASE_URL}/1/schedules`, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzYwODg0NjMsImV4cCI6MTY3NjE3NDg2M30.1Pm6qt_on0IEM9NAoa55co1vixXY67gyVo4plubt4T5aXHvNEu_P3LPTsF5LNWIelYBXowIBPttiRR2Y0wDJmw`,
        Accept: "application/json",
      },
    });

    const data = await response.json();

    return data;
  } catch (error: any) {
    console.log(error);
  }
}

// 일정 등록 http://localhost:8080/studies/1/schdules
export async function calendarCreateApi(data: IRegistData) {
  try {
    await axios.post(`${BASE_URL}/1/schedules`, JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${token}`,
        // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzYwODg0NjMsImV4cCI6MTY3NjE3NDg2M30.1Pm6qt_on0IEM9NAoa55co1vixXY67gyVo4plubt4T5aXHvNEu_P3LPTsF5LNWIelYBXowIBPttiRR2Y0wDJmw`,
        "Content-Type": `application/json`,
      },
    });
  } catch (error: any) {
    // 에러 발생 시
    console.log(error);
  }
}

// 회의 조회
export async function meetingSelectAllApi() {
  try {
    const response = await fetch(`${BASE_URL}/1/meetings`, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzYwODg0NjMsImV4cCI6MTY3NjE3NDg2M30.1Pm6qt_on0IEM9NAoa55co1vixXY67gyVo4plubt4T5aXHvNEu_P3LPTsF5LNWIelYBXowIBPttiRR2Y0wDJmw`,
        Accept: "application/json",
      },
    });

    const data = await response.json();

    return data;
  } catch (error: any) {
    console.log(error);
  }
}

// 일정 삭제
export async function deleteScheduleApi(scheduleId: number) {
  try {
    await axios.delete(`${BASE_URL}/1/schedules/${scheduleId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzYwODg0NjMsImV4cCI6MTY3NjE3NDg2M30.1Pm6qt_on0IEM9NAoa55co1vixXY67gyVo4plubt4T5aXHvNEu_P3LPTsF5LNWIelYBXowIBPttiRR2Y0wDJmw`,
      },
    });
  } catch (error: any) {
    console.log(error);
  }
}

// 일정 단건 조회
export async function scheduleSelectApi(scheduleId: number) {
  try {
    const response = await fetch(`${BASE_URL}/1/schedules/${scheduleId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzYwODg0NjMsImV4cCI6MTY3NjE3NDg2M30.1Pm6qt_on0IEM9NAoa55co1vixXY67gyVo4plubt4T5aXHvNEu_P3LPTsF5LNWIelYBXowIBPttiRR2Y0wDJmw`,
        Accept: "application/json",
      },
    });
    const data = await response.json();

    return data;
  } catch (error: any) {
    console.log(error);
  }
}

// 일정 수정하기 /studies/1/scedules/1
export async function scheduleUpdateApi(data: any, scheduleId: number) {
  try {
    await axios.patch(
      `${BASE_URL}/1/schedules/${scheduleId}`,
      JSON.stringify(data),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzYwODg0NjMsImV4cCI6MTY3NjE3NDg2M30.1Pm6qt_on0IEM9NAoa55co1vixXY67gyVo4plubt4T5aXHvNEu_P3LPTsF5LNWIelYBXowIBPttiRR2Y0wDJmw`,
          "Content-Type": `application/json`,
        },
      },
    );
  } catch (error: any) {
    // 에러 발생 시
    console.log(error);
  }
}
