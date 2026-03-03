interface SidebarProps {
  isOpen?: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  return (
    <aside
      className={`flex flex-col border-gray-300 h-full overflow-hidden transition-all duration-300 ease-in shrink-0 ${
        isOpen
          ? "w-62 p-4 border-r-2 opacity-100"
          : "w-0 p-0 border-r-0 opacity-0"
      }`}
    >
      <nav className="flex flex-col gap-4  whitespace-nowrap">
        <h2 className="font-bold text-xl mb-2 ">Chat Menu</h2>
        <div className="p-2 hover:bg-gray-100 rounded cursor-pointer">
          Contacts
        </div>
        <div className="p-2 hover:bg-gray-100 rounded cursor-pointer">
          Saved Messages
        </div>
        <div className="p-2 hover:bg-gray-100 rounded cursor-pointer">
          Settings
        </div>
      </nav>

      <div className="mt-auto text-xs text-gray-400">v-0.3.mood</div>
    </aside>
  );
};

export default Sidebar;
