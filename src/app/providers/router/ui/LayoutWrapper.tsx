import { ReactNode, useState } from "react";
import { Navbar } from "widgets/Navbar";
import { Sidebar } from "widgets/Sidebar";
import { classNames, Mods } from "shared/library/classNames/classNames";

interface LayoutWrapperProps {
    children: ReactNode;
}

export const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const Mods: Mods = {
        "sidebar-collapsed": isCollapsed,
    }

    return (
        <>
            <Navbar 
                toggleCollapse={() => setIsCollapsed(!isCollapsed)} 
                isCollapsed={isCollapsed} 
            />
            <Sidebar isCollapsed={isCollapsed} />
            <div className={classNames("content-page", Mods, [])}>
                {children}
            </div>
        </>
    );
};
