import AccountMainNav from './AccountMainNav';

export default function AccountAsideBar() {
  return (
    <aside className='flex bg-white flex-col h-full basis-[14rem] border-r py-4 px-6'>
      <h2 className='text-left'>Pp</h2>
      <div className='flex py-3 flex-col items-center justify-center mb-5'></div>

      <AccountMainNav />
    </aside>
  );
}
