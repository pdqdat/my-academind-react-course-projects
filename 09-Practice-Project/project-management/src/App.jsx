import { useState } from "react";

import ProjectsSidebar from "./components/ProjectsSidebar.jsx";
import NewProject from "./components/project/NewProject.jsx";
import NoProjectSelected from "./components/project/NoProjectSelected.jsx";
import SelectedProject from "./components/project/SelectedProject.jsx";

function App() {
    const [projectsState, setProjectsState] = useState({
        selectedProjectId: undefined,
        projects: [],
        tasks: [],
    });

    // * Project handlers
    function handleSelectProject(id) {
        setProjectsState((prevState) => {
            return { ...prevState, selectedProjectId: id };
        });
    }

    function handleStartAddProject() {
        setProjectsState((prevState) => {
            return { ...prevState, selectedProjectId: null };
        });
    }

    function handleCancelAddProject() {
        setProjectsState((prevState) => {
            return { ...prevState, selectedProjectId: undefined };
        });
    }

    function handleAddProject(projectData) {
        const newProject = { ...projectData, id: Math.random() };

        setProjectsState((prevState) => {
            return { ...prevState, selectedProjectId: undefined, projects: [...prevState.projects, newProject] };
        });
    }

    function handleDeleteProject() {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                selectedProjectId: undefined,
                projects: prevState.projects.filter((project) => project.id !== prevState.selectedProjectId),
            };
        });
    }

    // * Task handlers
    function handleAddTask(text) {
        const newTask = { text: text, projectId: projectsState.selectedProjectId, id: Math.random() };

        setProjectsState((prevState) => {
            return { ...prevState, tasks: [newTask, ...prevState.tasks] };
        });
    }

    function handleDeleteTask(id) {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                tasks: prevState.tasks.filter((tasks) => tasks.id !== id),
            };
        });
    }

    let content;
    if (projectsState.selectedProjectId === null) {
        content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />;
    } else if (projectsState.selectedProjectId === undefined) {
        content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
    } else {
        const selectedProject = projectsState.projects.find(
            (project) => project.id === projectsState.selectedProjectId
        );
        content = (
            <SelectedProject
                project={selectedProject}
                onDelete={handleDeleteProject}
                tasks={projectsState.tasks}
                onAddTask={handleAddTask}
                onDeleteTask={handleDeleteTask}
            />
        );
    }

    return (
        <main className="h-screen my-8 flex gap-8">
            <ProjectsSidebar
                onStartAddProject={handleStartAddProject}
                projects={projectsState.projects}
                onSelectProject={handleSelectProject}
                selectedProjectId={projectsState.selectedProjectId}
            />
            {content}
        </main>
    );
}

export default App;
