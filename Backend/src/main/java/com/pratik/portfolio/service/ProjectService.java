package com.pratik.portfolio.service;

import com.pratik.portfolio.entity.Project;
import com.pratik.portfolio.repository.ProjectRepository;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<Map<String, Object>> getAllProjects() {
        List<Project> projects = projectRepository.findAll();
        List<Map<String, Object>> result = new ArrayList<>();

        for (Project project : projects) {
            Map<String, Object> map = new LinkedHashMap<>();
            map.put("id", project.getId());
            map.put("title", project.getTitle());
            map.put("subtitle", project.getSubtitle());
            map.put("description", project.getDescription());
            map.put("techStack", splitCsv(project.getTechStack()));
            map.put("category", project.getCategory());
            map.put("githubUrl", project.getGithubUrl());
            map.put("demoUrl", project.getDemoUrl());
            map.put("features", splitCsv(project.getFeatures()));
            map.put("gradient", project.getGradient());
            map.put("accentColor", project.getAccentColor());
            result.add(map);
        }

        return result;
    }

    public List<Map<String, Object>> getProjectsByCategory(String category) {
        List<Project> projects = projectRepository.findByCategory(category);
        List<Map<String, Object>> result = new ArrayList<>();

        for (Project project : projects) {
            Map<String, Object> map = new LinkedHashMap<>();
            map.put("id", project.getId());
            map.put("title", project.getTitle());
            map.put("subtitle", project.getSubtitle());
            map.put("description", project.getDescription());
            map.put("techStack", splitCsv(project.getTechStack()));
            map.put("category", project.getCategory());
            map.put("githubUrl", project.getGithubUrl());
            map.put("demoUrl", project.getDemoUrl());
            map.put("features", splitCsv(project.getFeatures()));
            map.put("gradient", project.getGradient());
            map.put("accentColor", project.getAccentColor());
            result.add(map);
        }

        return result;
    }

    private List<String> splitCsv(String csv) {
        if (csv == null || csv.isBlank()) return List.of();
        return Arrays.stream(csv.split(","))
                .map(String::trim)
                .toList();
    }
}
