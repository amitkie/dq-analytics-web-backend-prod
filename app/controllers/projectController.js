const projectService = require("../services/projectService")
const { ValidationError } = require("../handlers/errorHandler");
const { createErrorResponse } = require("../utils/errorResponse");
const { createSuccessResponse } = require("../utils/successResponse");

const createProject = async (req, res) => {
    try {
        const response = await projectService.createProject(req.body);

        const successResponse = createSuccessResponse(200, 'Project created successfully', response);
        return res.status(200).json(successResponse);
    } catch (error) {
        console.error('Error in createProject:', error);

        // Handle known validation errors
        if (error.message === 'User not found') {
            const errorResponse = createErrorResponse(400, 'VALIDATION_ERROR', error.message);
            return res.status(400).json(errorResponse);
        }

        // Handle unknown errors
        const errorResponse = createErrorResponse(500, 'INTERNAL_SERVER_ERROR', 'Internal Server Error', error.message);
        return res.status(500).json(errorResponse);
    }
};

const getProjectByIdController = async (req, res) => {
    try {
      const { project_id } = req.query;
  
      if (!project_id) {
        return res.status(400).json({ message: 'project_id query parameter is required' });
      }
  
      const project = await projectService.getProjectById(project_id);
  
      return res.status(200).json({ project });
    } catch (error) {
      if (error.message === 'Project not found') {
        return res.status(404).json({ message: error.message });
      }
  
      console.error('Error fetching project:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  const getProjectByUserIdController = async (req, res) => {
    try {
      const { user_id } = req.query;
  
      if (!user_id) {
        return res.status(400).json({ message: 'user_id query parameter is required' });
      }
  
      const project = await projectService.getProjectByUserId(user_id);
  
      return res.status(200).json({ project });
    } catch (error) {
      if (error.message === 'Project not found') {
        return res.status(404).json({ message: error.message });
      }
  
      console.error('Error fetching project:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  const createUrl = async (req, res) => {
    const { userId, tabName, urls } = req.body;
  
    try {
      // Find or create the user URL entry
     
  const userUrl = await projectService.createOrUpdateUrls(userId, tabName, urls)
      res.status(200).json({
        message:  'URLs created successfully' ,
        urls: userUrl.urls,
      });
    } catch (error) {
      console.error('Error creating or updating URLs:', error);
      res.status(500).json({ message: 'Error creating or updating URLs', error });
    }
  };

  const getUrl = async (req, res) => {
    const { userId } = req.query;
  
    try {
      const data = await projectService.getUrlsByUserId(userId);
  
      res.status(200).json({
        message: 'URLs fetched successfully',
        data
      });
    } catch (error) {
      console.error('Error fetching URLs:', error);
      res.status(500).json({
        message: 'Error fetching URLs',
        error: error.message
      });
    }
  };


module.exports = {createProject, getProjectByIdController ,getProjectByUserIdController, createUrl, getUrl};
