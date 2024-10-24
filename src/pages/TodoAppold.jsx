import React, { useState } from 'react';
import { Input, Button, Table, Checkbox, message, Modal } from 'antd';
import Sidebar from '../Components/Sidebar';
import 'antd/dist/reset.css';

const TodoApp = () => {
    const [taskName, setTaskName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [tasks, setTasks] = useState([]);
    const [editTask, setEditTask] = useState(null);
    const [filter, setFilter] = useState('All');

    const handleAddTask = () => {
        if (taskName && startDate && endDate) {
            const newTask = {
                id: tasks.length + 1,
                name: taskName,
                startDate,
                endDate,
                status: 'Pending',
            };
            setTasks([...tasks, newTask]);
            setTaskName('');
            setStartDate('');
            setEndDate('');
            message.success('Task berhasil ditambahkan');
        } else {
            message.error('Mohon masukkan task, tanggal mulai, dan tanggal akhir.');
        }
    };

    const handleDeleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
        message.success('Task berhasil dihapus');
    };

    const handleEditTask = (task) => {
        setEditTask(task);
    };

    const handleSaveEdit = () => {
        setTasks(tasks.map(task => (task.id === editTask.id ? editTask : task)));
        setEditTask(null);
        message.success('Task berhasil diedit');
    };

    const handleCancelEdit = () => {
        setEditTask(null);
    };

    const handleMarkComplete = (id) => {
        setTasks(tasks.map(task => 
            task.id === id
            ? { ...task, status: task.status === 'Completed' ? 'Pending' : 'Completed' }
            : task
        ));
        message.success('Status task berhasil diperbarui');
    };

    const getFilteredTasks = () => {
        if (filter === 'Pending') {
            return tasks.filter(task => task.status === 'Pending');
        } else if (filter === 'Completed') {
            return tasks.filter(task => task.status === 'Completed');
        }
        return tasks;
    };

    const columns = [
        {
            title: 'No',
            dataIndex: 'id',
            key: 'id',
            render: (text, record, index) => index + 1,
            className: 'text-center',
            onCell: () => ({
                style: { padding: '12px', border: '1px solid #ddd' },
            }),
        },
        {
            title: 'Check Box',
            dataIndex: 'checkbox',
            key: 'checkbox',
            render: (text, record) => (
                <Checkbox
                    checked={record.status === 'Completed'}
                    onChange={() => handleMarkComplete(record.id)}
                />
            ),
            className: 'text-center',
            onCell: () => ({
                style: { padding: '12px', border: '1px solid #ddd' },
            }),
        },
        {
            title: 'Task',
            dataIndex: 'name',
            key: 'name',
            className: 'text-center',
            onCell: () => ({
                style: { padding: '12px', border: '1px solid #ddd' },
            }),
        },
        {
            title: 'Start Date',
            dataIndex: 'startDate',
            key: 'startDate',
            className: 'text-center',
            onCell: () => ({
                style: { padding: '12px', border: '1px solid #ddd' },
            }),
        },
        {
            title: 'End Date',
            dataIndex: 'endDate',
            key: 'endDate',
            className: 'text-center',
            onCell: () => ({
                style: { padding: '12px', border: '1px solid #ddd' },
            }),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            className: 'text-center',
            onCell: () => ({
                style: { padding: '12px', border: '1px solid #ddd' },
            }),
        },
        {
            title: 'Aksi',
            key: 'aksi',
            render: (text, record) => (
                <div className="text-center">
                    <Button type="primary" className="mr-2" onClick={() => handleEditTask(record)}>
                        Edit
                    </Button>
                    <Button 
                        type="danger" 
                        onClick={() => handleDeleteTask(record.id)}
                        style={{ backgroundColor: '#FF4B50', borderColor: '#FF4B50', color: 'white' }} // Tambahkan warna merah
                    >
                        Delete
                    </Button>
                </div>
            ),
            className: 'text-center',
            onCell: () => ({
                style: { padding: '12px', border: '1px solid #ddd' },
            }),
        },
    ];

    return (
        <div className="bg-gray-100 min-h-screen flex">
            {/* Sidebar */}
            <Sidebar onFilterChange={setFilter} />

            {/* Main Content */}
            <div className="flex-1 p-12 ml-64"> {/* Pastikan konten utama menggunakan seluruh layar */}
                <div className="bg-white p-8 rounded-lg shadow-md w-full h-full">
                    <h1 className="text-center text-2xl font-bold mb-6">HALAMAN DASHBOARD ADMIN</h1>
                    
                    {/* Ubah background menjadi putih */}
                    <div className="bg-white p-8 rounded-lg mb-8">
                        <h2 className="text-lg font-bold mb-4 text-left">Input Todo</h2> {/* Teks dipindahkan ke kiri */}
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Task</label>
                                <Input
                                    value={taskName}
                                    onChange={(e) => setTaskName(e.target.value)}
                                    placeholder="Masukkan Task"
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Start Date</label>
                                <Input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">End Date</label>
                                <Input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                        </div>

                        <div className="flex justify-start">
                            <Button type="primary" onClick={handleAddTask} className="mb-8">
                                Proses
                            </Button>
                        </div>
                    </div>

                    {/* Tabel tanpa div tambahan */}
                    <Table
                        columns={columns}
                        dataSource={getFilteredTasks()}
                        rowKey="id"
                        pagination={false}
                        className="w-full bg-white border border-gray-300"
                    />

                    {/* Modal untuk Edit Tugas */}
                    {editTask && (
                        <Modal
                            title="Edit Data"
                            visible={true}
                            footer={null}
                            onCancel={handleCancelEdit}
                            transitionName="zoom"
                            maskTransitionName="fade"
                        >
                            <label className="block mb-2">Task Name</label>
                            <Input
                                value={editTask.name}
                                onChange={(e) => setEditTask({ ...editTask, name: e.target.value })}
                                className="mb-4"
                                placeholder="Ubah Nama Task"
                            />
                            <label className="block mb-2">Start Date</label>
                            <Input
                                type="date"
                                value={editTask.startDate}
                                onChange={(e) => setEditTask({ ...editTask, startDate: e.target.value })}
                                className="mb-4"
                                placeholder="Ubah Start Date"
                            />
                            <label className="block mb-2">End Date</label>
                            <Input
                                type="date"
                                value={editTask.endDate}
                                onChange={(e) => setEditTask({ ...editTask, endDate: e.target.value })}
                                placeholder="Ubah End Date"
                            />
                            <div className="flex space-x-2 mt-4">
                                <Button type="primary" onClick={handleSaveEdit} style={{ backgroundColor: 'green', borderColor: 'green' }}>
                                    Proceed
                                </Button>
                                <Button type="danger" onClick={handleCancelEdit} style={{ backgroundColor: 'red', borderColor: 'red' }}>
                                    Discard
                                </Button>
                            </div>
                        </Modal>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TodoApp;
