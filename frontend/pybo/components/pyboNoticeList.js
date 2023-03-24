import PyborNoticeCard from "./pyboNoticeCard";

export default function PyboNoticeList({ notices }) {
  return (
    <>
      {notices.map((notice, index) => (
        <PyborNoticeCard key={notice.id} notice={notice} />
      ))}
    </>
  );
}
