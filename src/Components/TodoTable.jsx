import React from 'react';
import { Table, Button, Checkbox } from 'antd';

const TodoTable = ({ tasks }) => {
    const columns = [
        {
            title: 'No',
            dataIndex: 'id',
            key: 'id',
            render: (text, record, index) => index + 1,
            className: 'text-center',
        },
        {
            title: 'Check Box',
            dataIndex: 'checkbox',
            key: 'checkbox',
            render: () => <Checkbox />,
            className: 'text-center',
        },
        {
            title: 'Task',
            dataIndex: 'name',
            key: 'name',
            className: 'text-center',
        },
        {
            title: 'Start Date',
            dataIndex: 'startDate',
            key: 'startDate',
            className: 'text-center',
        },
        {
            title: 'End Date',
            dataIndex: 'endDate',
            key: 'endDate',
            className: 'text-center',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            className: 'text-center',
        },
        {
            title: 'Aksi',
            key: 'aksi',
            render: () => (
                <div className="text-center">
                    <Button type="primary" className="mr-2">
                        Edit
                    </Button>
                    <Button type="danger">Delete</Button>
                </div>
            ),
            className: 'text-center',
        },
    ];

    return (
        <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Todo List</h2>
            <Table
                columns={columns}
                dataSource={tasks}
                rowKey="id"
                pagination={false}
                className="min-w-full bg-white"
            />
        </div>
    );
};

export default TodoTable;
