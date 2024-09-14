import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { fetchTasks, deleteTask, updateTaskStatus } from '../api/tasks';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import TaskItem from './TaskItem';

const TaskList = () => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['tasks', filter, search, page],
    queryFn: () => fetchTasks({ status: filter, search, page }),
  });

  const handleDelete = async (id) => {
    await deleteTask(id);
    refetch();
  };

  const handleStatusChange = async (id, status) => {
    await updateTaskStatus(id, status);
    refetch();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Task List</h1>
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded p-2"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      <Link to="/create">
        <Button>Create New Task</Button>
      </Link>
      <ul className="space-y-2">
        {data?.results.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        ))}
      </ul>
      <div className="flex justify-between">
        <Button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={!data?.next}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default TaskList;