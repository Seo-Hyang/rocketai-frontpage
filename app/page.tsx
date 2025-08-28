import Image from "next/image";
import FortuneTable from "@/components/FortuneTable";

export default function Page() {
  const userName = "김로켓";

  return (
    <div className="w-full overflow-x-auto">
      <div className="relative w-full min-w-[320px] max-w-md mx-auto cq">
        <Image
          src="/assets/group.png"
          alt="background asset image"
          width={375}
          height={2081}
          className="w-full h-auto"
          priority
        />
        <div
          className="absolute text-xs sm:text-sm md:text-base lg:text-lg text-center content-center font-bold text-stone-700"
          style={{
            top: "31.4%",
            left: "10%",
            width: "50%",
            height: "4%",
          }}
        >
          이제 본격적으로 <br />
          {userName}님의 사주팔자를 <br />
          분석해볼 차례네요.
        </div>
        <div
          className="absolute text-xs sm:text-sm md:text-base lg:text-lg text-center content-center font-bold text-stone-700"
          style={{
            top: "49%",
            left: "5%",
            width: "65%",
            height: "3%",
          }}
        >
          제가 {userName}님의 사주를 <br />
          보기 쉽게 표로 정리했어요
        </div>
        <div
          className="absolute w-full"
          style={{
            top: "68%",
          }}
        >
          <Image
            src="/assets/fortune-table-bg.png"
            alt="background asset image"
            width={208}
            height={520}
            className="w-[95%] h-auto mx-auto shadow-lg"
          />
          <div className="absolute inset-x-3" style={{ top: "3%" }}>
            <FortuneTable
              user_name="김로켓"
              user_birth_year={1980}
              user_birth_month={8}
              user_birth_day={27}
              user_birth_time="08:10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
