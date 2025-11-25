import AccountMainNav from './AccountMainNav';

export default function AccountAsideBar() {
  return (
    <aside className='flex bg-white flex-col h-full basis-[14rem] border-r py-4 px-6'>
      <div className='flex py-3 flex-col items-center justify-center border-b mb-5'>
        <h2>Pp</h2>
        <h4 className='text-lg font-semibold mt-2 uppercase tracking-widest'>
          From Request to Receipt — Powered by Intelligence
        </h4>
      </div>

      <AccountMainNav />
    </aside>
  );
}
