import { University, Course, Application } from "../types";

export const api = {
  getUniversities: async (): Promise<University[]> => {
    const res = await fetch("/api/universities");
    return res.json();
  },
  getUniversity: async (id: string): Promise<University> => {
    const res = await fetch(`/api/universities/${id}`);
    return res.json();
  },
  getCourses: async (): Promise<Course[]> => {
    const res = await fetch("/api/courses");
    return res.json();
  },
  getCourse: async (id: string): Promise<Course> => {
    const res = await fetch(`/api/courses/${id}`);
    return res.json();
  },
  getApplications: async (studentId: number): Promise<Application[]> => {
    const res = await fetch(`/api/applications/${studentId}`);
    return res.json();
  },
  submitApplication: async (app: Partial<Application>): Promise<Application> => {
    const res = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(app),
    });
    return res.json();
  },
  login: async (email: string, name?: string): Promise<any> => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name }),
    });
    return res.json();
  },
  updateUser: async (id: number, updates: Partial<any>): Promise<any> => {
    const res = await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    return res.json();
  }
};
