import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchTask, updateTask } from '../api/tasks';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(null);

  const { data: task, isLoading, error } = useQuery({
    queryKey: ['task', id],
    queryFn: () => fetchTask(id),
  });

  const updateMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      setIsEditing(false);
      navigate('/');
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleEdit = () => {
    setIsEditing(true);
    setEditedTask({ ...task });
  };

  const handleSave = () => {
    updateMutation.mutate(editedTask);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTask(null);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Task Detail</h1>
      {isEditing ? (
        <div className="space-y-2">
          <Input
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
          />
          <Textarea
            value={editedTask.description}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
          />
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={editedTask.status}
              onCheckedChange={(checked) => setEditedTask({ ...editedTask, status: checked })}
            />
            <span>Completed</span>
          </div>
          <div className="space-x-2">
            <Button onClick={handleSave}>Save</Button>
            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <h2 className="text-xl">{task.title}</h2>
          <p>{task.description}</p>
          <p>Status: {task.status ? 'Completed' : 'Pending'}</p>
          <p>Created: {new Date(task.created_at).toLocaleString()}</p>
          <p>Updated: {new Date(task.updated_at).toLocaleString()}</p>
          <Button onClick={handleEdit}>Edit</Button>
        </div>
      )}
    </div>
  );
};

export default TaskDetail;