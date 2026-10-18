import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('tasks')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [task, setTask] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  function addTask() {
    if (!task.trim()) {
      alert('Please enter a task!')
      return
    }

    const newTask = {
      id: Date.now(),
      text: task.trim(),
      completed: false,
      dueDate,
      priority
    }

    setTasks(prev => [...prev, newTask])
    setTask('')
    setDueDate('')
    setPriority('Medium')
  }

  function toggleTask(id) {
    setTasks(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    )
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(item => item.id !== id))
  }

  function clearCompletedTasks() {
    setTasks(prev => prev.filter(item => !item.completed))
  }

  const filteredTasks = tasks.filter(item => {
    const matchesSearch = item.text
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesFilter =
      filter === 'all' ||
      (filter === 'pending' && !item.completed) ||
      (filter === 'completed' && item.completed)

    return matchesSearch && matchesFilter
  })

  const totalTasks = tasks.length
  const completedCount = tasks.filter(item => item.completed).length
  const pendingCount = totalTasks - completedCount

  return (
    <div className="app">
      <h1>My Task Manager 🚀</h1>
      <p>Manage your daily tasks</p>

      <div className="stats">
        <p>Total Tasks: {totalTasks}</p>
        <p>Pending: {pendingCount}</p>
        <p>Completed: {completedCount}</p>
      </div>

      <div className="task-input">
        <input
          type="text"
          value={task}
          onChange={e => setTask(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') addTask()
          }}
          placeholder="Enter a new task..."
        />

        <label>
          Due Date:
          <input
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
          />
        </label>

        <label>
          Priority:
          <select
            value={priority}
            onChange={e => setPriority(e.target.value)}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </label>

        <button onClick={addTask}>Add Task</button>
      </div>

      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search tasks..."
      />

      <div className="filters">
        <button onClick={() => setFilter('all')}>All Tasks</button>
        <button onClick={() => setFilter('pending')}>Pending</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={clearCompletedTasks}>Clear Completed</button>
      </div>

      <ul className="task-list">
        {filteredTasks.map(item => (
          <li key={item.id} className="task-item">
            <div className="task-details">
              <span
                style={{
                  textDecoration: item.completed
                    ? 'line-through'
                    : 'none'
                }}
              >
                {item.text}
              </span>

              <small>
                Due Date: {item.dueDate || 'Not set'}
              </small>

              <small>
                Priority:{' '}
                <strong
                  className={`priority-${item.priority || 'Medium'}`}
                >
                  {item.priority || 'Medium'}
                </strong>
              </small>
            </div>

            <div className="task-actions">
              <button onClick={() => toggleTask(item.id)}>
                {item.completed ? 'Undo' : 'Complete'}
              </button>

              <button onClick={() => deleteTask(item.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {filteredTasks.length === 0 && (
        <p>No tasks found.</p>
      )}
    </div>
  )
}

export default App