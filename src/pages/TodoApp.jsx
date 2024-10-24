import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { message, Button, Checkbox, Table, Input } from 'antd'; // Ant Design components
import Sidebar from '../Components/Sidebar';

const TodoApp = () => {
    const [taskName, setTaskName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [tasks, setTasks] = useState([]);
    const [editTask, setEditTask] = useState(null);
    const [filter, setFilter] = useState('All');

    // Fetch tasks from the backend
    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/tasks');
            setTasks(response.data);
        } catch (error) {
            message.error('Failed to fetch tasks');
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // Handle adding a task (POST request)
    const handleAddTask = async () => {
        if (taskName && startDate && endDate) {
            const newTask = {
                task_name: taskName,
                start_date: startDate,
                end_date: endDate,
                status: 'Pending',
            };
            try {
                const response = await axios.post('http://localhost:5000/tasks', newTask);
                message.success('Task berhasil ditambahkan');
                setTasks([...tasks, { id: response.data.taskId, ...newTask }]);
                setTaskName('');
                setStartDate('');
                setEndDate('');
            } catch (error) {
                message.error('Error adding task');
                console.error('Error adding task:', error);
            }
        } else {
            message.error('Mohon masukkan task, tanggal mulai, dan tanggal akhir.');
        }
    };

    // Handle deleting a task (DELETE request)
    const handleDeleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/tasks/${id}`);
            setTasks(tasks.filter((task) => task.id !== id));
            message.success('Task berhasil dihapus');
        } catch (error) {
            message.error('Failed to delete task');
            console.error('Error deleting task:', error);
        }
    };

    // Handle editing a task (PUT request)
    const handleSaveEdit = async () => {
        try {
            await axios.put(`http://localhost:5000/tasks/${editTask.id}`, {
                task_name: editTask.name,
                start_date: editTask.startDate,
                end_date: editTask.endDate,
                status: editTask.status,
            });
            setTasks(tasks.map((task) => (task.id === editTask.id ? editTask : task)));
            setEditTask(null);
            message.success('Task berhasil diedit');
        } catch (error) {
            message.error('Error updating task');
            console.error('Error updating task:', error);
        }
    };

    const handleCancelEdit = () => {
        setEditTask(null);
    };

    const handleMarkComplete = async (id) => {
        const task = tasks.find((task) => task.id === id);
        const updatedStatus = task.status === 'Completed' ? 'Pending' : 'Completed';

        try {
            await axios.put(`http://localhost:5000/tasks/${id}`, {
                ...task,
                status: updatedStatus,
            });
            setTasks(
                tasks.map((task) =>
                    task.id === id ? { ...task, status: updatedStatus } : task
                )
            );
            message.success('Status task berhasil diperbarui');
        } catch (error) {
            message.error('Failed to update task status');
            console.error('Error updating task status:', error);
        }
    };

    // Function to handle editing a task
    const handleEditTask = (task) => {
        setEditTask({
            id: task.id,
            name: task.name,
            startDate: task.startDate,
            endDate: task.endDate,
            status: task.status,
        });
    };

    const getFilteredTasks = () => {
        if (filter === 'Pending') {
            return tasks.filter((task) => task.status === 'Pending');
        } else if (filter === 'Completed') {
            return tasks.filter((task) => task.status === 'Completed');
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
            dataIndex: 'task_name', // Update this
            key: 'task_name', // Update this
            className: 'text-center',
            onCell: () => ({
                style: { padding: '12px', border: '1px solid #ddd' },
            }),
        },
        {
            title: 'Start Date',
            dataIndex: 'start_date', // Update this
            key: 'start_date', // Update this
            className: 'text-center',
            onCell: () => ({
                style: { padding: '12px', border: '1px solid #ddd' },
            }),
        },
        {
            title: 'End Date',
            dataIndex: 'end_date', // Update this
            key: 'end_date', // Update this
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
                    <Button
                        type="primary"
                        className="mr-2"
                        onClick={() => handleEditTask(record)}
                    >
                        Edit
                    </Button>
                    <Button
                        type="danger"
                        onClick={() => handleDeleteTask(record.id)}
                        style={{
                            backgroundColor: '#FF4B50',
                            borderColor: '#FF4B50',
                            color: 'white',
                        }}
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
            <div className="flex-1 p-12 ml-64">
                {/* Ubah background menjadi putih */}
                <div className="bg-white p-8 rounded-lg shadow-md w-full h-full">
                    <h1 className="text-center text-2xl font-bold mb-6">
                        HALAMAN DASHBOARD ADMIN
                    </h1>

                    {/* Ubah background menjadi putih */}
                    <div className="bg-white p-8 rounded-lg mb-8">
                        <h2 className="text-lg font-bold mb-4 text-left">Input Todo</h2>
                        {/* Teks dipindahkan ke kiri */}
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
                        <div className="text-left">
                            {/* Tombol dipindahkan ke kiri */}
                            <Button
                                onClick={handleAddTask}
                                type="primary"
                                className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                            >
                                Tambah Task
                            </Button>
                        </div>
                    </div>

                    <h2 className="text-lg font-bold mb-4 text-left">Table Todo</h2>
                    <div className="bg-white p-8 rounded-lg">
                        <Table
                            columns={columns}
                            dataSource={getFilteredTasks()}
                            rowKey={(record) => record.id}
                            pagination={{ pageSize: 5 }}
                            bordered
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodoApp;
