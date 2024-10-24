import React, { useState } from 'react';
import { Button, Menu } from 'antd';
import { CloseOutlined, MenuOutlined, LogoutOutlined, DownOutlined, CheckCircleOutlined, ClockCircleOutlined, FileTextOutlined } from '@ant-design/icons';

const Sidebar = ({ onFilterChange }) => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [isTaskStatusOpen, setIsTaskStatusOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const toggleTaskStatus = () => {
        setIsTaskStatusOpen(!isTaskStatusOpen);
    };

    return (
        <div>
            <div 
                className={`h-screen p-6 bg-white shadow-lg w-64 fixed top-0 left-0 z-10 flex flex-col justify-between transition-transform duration-700 ${isSidebarVisible ? 'translate-x-0' : '-translate-x-full'}`}
                style={{ willChange: 'transform' }}
            >
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                            {/* Task Icon */}
                        </div>
                        <Button
                            type="text"
                            icon={<CloseOutlined />}
                            className="text-xl"
                            onClick={toggleSidebar} // Hide the sidebar
                        />
                    </div>

                    {/* Task Status Dropdown */}
                    <div className="mb-6">
                        <div
                            className="flex items-center justify-between cursor-pointer"
                            onClick={toggleTaskStatus}
                        >
                            <div className="flex items-center space-x-2">
                                <FileTextOutlined className="mr-2" style={{ fontSize: '16px' }} />
                                <h1 className="text-base font-medium">Task Status</h1>
                            </div>
                            <DownOutlined 
                                style={{ 
                                    fontSize: '12px', 
                                    transform: isTaskStatusOpen ? 'rotate(180deg)' : 'rotate(0deg)', 
                                    transition: 'transform 0.3s ease' 
                                }} 
                            />
                        </div>

                        {/* Animasi smooth untuk dropdown */}
                        <div
                            className={`transition-all duration-500 ease-in-out ${isTaskStatusOpen ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0'}`}
                            style={{
                                overflow: 'hidden',
                                transition: 'max-height 0.5s ease, opacity 0.5s ease',
                            }}
                        >
                            <Menu mode="inline" className="space-y-2 mt-2">
                                <Menu.Item
                                    key="1"
                                    icon={<FileTextOutlined />}  // All Tasks Icon
                                    onClick={() => onFilterChange('All')}
                                >
                                    Semua Tugas
                                </Menu.Item>
                                <Menu.Item
                                    key="2"
                                    icon={<ClockCircleOutlined />}  // Pending Task Icon
                                    onClick={() => onFilterChange('Pending')}
                                >
                                    Pending Task
                                </Menu.Item>
                                <Menu.Item
                                    key="3"
                                    icon={<CheckCircleOutlined />}  // Done Task Icon
                                    onClick={() => onFilterChange('Completed')}
                                >
                                    Done Task
                                </Menu.Item>
                            </Menu>
                        </div>
                    </div>
                </div>

                {/* Footer with Profile Image and Logout */}
                <div className="flex items-center justify-between p-4 border-t">
                    <div className="flex items-center">
                        {/* Gambar profil di samping Kennz */}
                        <img 
                            src="/public/images/Profile.jpg"  // Menggunakan gambar dari public/images
                            alt="Profile"
                            className="rounded-full h-8 w-8 mr-2 object-cover"
                        />
                        <span>Kennz</span>
                    </div>
                    <Button
                        type="text"
                        icon={<LogoutOutlined />}
                        onClick={() => console.log('Logout')}
                    />
                </div>
            </div>

            {/* Toggle Button for Drawer */}
            {!isSidebarVisible && (
                <Button
                    type="text"
                    icon={<MenuOutlined />}
                    className="text-2xl fixed top-6 left-6 z-20"
                    onClick={toggleSidebar} // Show the sidebar when clicked
                />
            )}
        </div>
    );
};

export default Sidebar;
