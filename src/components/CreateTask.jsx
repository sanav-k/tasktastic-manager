import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createTask } from '../api/tasks';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const CreateTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      navigate('/');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ title, description });
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Create New Task</h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button type="submit">Create Task</Button>
      </form>
    </div>
  );
};

export default CreateTask;