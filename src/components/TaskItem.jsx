import React from 'react';
import { Link } from 'react-router-dom';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const TaskItem = ({ task, onDelete, onStatusChange }) => {
  return (
    <li className="flex items-center justify-between p-2 border rounded">
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={task.status}
          onCheckedChange={(checked) => onStatusChange(task.id, checked)}
        />
        <Link to={`/task/${task.id}`} className="text-blue-600 hover:underline">
          {task.title}
        </Link>
      </div>
      <Button variant="destructive" onClick={() => onDelete(task.id)}>Delete</Button>
    </li>
  );
};

export default TaskItem;