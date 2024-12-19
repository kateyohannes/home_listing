package routes

import (
	controller "resturant-managment/controllers"

	"github.com/gin-gonic/gin"
)

func UserRoutes(routes *gin.Engine) {
	routes.GET("/users", controller.GetUsers())
	routes.GET("/user/:user_id", controller.GetUser())
	routes.POST("/user/signup", controller.SignUp())
	routes.POST("/user/login", controller.LogIn())
}
