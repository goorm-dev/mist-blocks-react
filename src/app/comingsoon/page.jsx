import { redirect } from 'next/navigation';

export default function ComingsoonPage() {
  // 메인 페이지로 이동하도록 수정
  redirect('/');
  return null;
}
