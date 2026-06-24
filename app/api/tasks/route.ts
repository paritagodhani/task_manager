import { connectDB } from '@/lib/mongodb';
import { Task } from '@/lib/models/Task';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const priority = searchParams.get('priority');
    const status = searchParams.get('status');

    let query: any = {};

    if (priority && priority !== 'All') {
      query.priority = priority;
    }

    if (status && status !== 'All') {
      query.status = status;
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        count: tasks.length,
        data: tasks,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('GET /api/tasks error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch tasks',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { title, description, priority, status, dueDate } = body;

    // Validation
    const errors: string[] = [];

    if (!title || title.length < 3) {
      errors.push('Title must be at least 3 characters long');
    }

    if (!description || description.length < 10) {
      errors.push('Description must be at least 10 characters long');
    }

    if (!priority || !['Low', 'Medium', 'High'].includes(priority)) {
      errors.push('Invalid priority. Must be Low, Medium, or High');
    }

    if (!status || !['Pending', 'Completed'].includes(status)) {
      errors.push('Invalid status. Must be Pending or Completed');
    }

    if (!dueDate) {
      errors.push('Due date is required');
    } else {
      const dueDateObj = new Date(dueDate);
      if (dueDateObj <= new Date()) {
        errors.push('Due date must be in the future');
      }
    }

    if (errors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors,
        },
        { status: 400 }
      );
    }

    const task = await Task.create({
      title,
      description,
      priority,
      status,
      dueDate: new Date(dueDate),
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Task created successfully',
        data: task,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST /api/tasks error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create task',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
