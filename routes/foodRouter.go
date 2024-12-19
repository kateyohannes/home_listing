package routes

import (
	controller "resturant-managment/controllers"

	"github.com/gin-gonic/gin"
)

func foodRoutes(routes *gin.Engine) {
	routes.GET("/foods", controller.GetFoods())
	routes.GET("/food/:food_id", controller.GetFood())
	routes.POST("/food/add", controller.AddFood())
	routes.PATCH("/food/update/:food_id", controller.UpdateFood())
	routes.DELETE("/food/delete/:food_id", controller.DeleteFood())
}
