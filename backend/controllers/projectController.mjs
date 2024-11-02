import { Project } from "../models/Project.mjs";

export const createProject = async (req, res) => {
  try {
    const owner = req.params.username;
    const { name, description, html, css, js } = req.body;

    // Check if user is authenticated
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Access denied" });
    }

    // Check if the username of the authenticated user matches the owner of the project
    if (req.user.username !== owner) {
      return res.status(401).json({ message: "Access denied" });
    }

    const project = new Project({ owner, name, description, html, css, js });
    await project.save();

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProject = async (req, res) => {
  try {
    const owner = req.params.username;
    const projectId = req.params.projectId;

    // Check if the user is authenticated
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Access denied" });
    }

    // Check if the username of the authenticated user matches the owner of the project
    if (req.user.username !== owner) {
      return res.status(401).json({ message: "Access denied" });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    const owner = req.params.username;

    // Check if the user is authenticated
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Access denied" });
    }

    // Check if the username of the authenticated user matches the owner of the project
    if (req.user.username !== owner) {
      return res.status(401).json({ message: "Access denied" });
    }

    const projects = await Project.find({ owner }).sort({ createdAt: -1 });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a project given its id
export const deleteProject = async (req, res) => {
  try {
    const owner = req.params.username;
    const projectId = req.params.projectId;

    // Check if the user is authenticated
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Access denied" });
    }

    // Check if the username of the authenticated user matches the owner of the project
    if (req.user.username !== owner) {
      return res.status(401).json({ message: "Access denied" });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    await Project.findByIdAndDelete(projectId);

    res.status(200).json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
