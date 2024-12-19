package routes

import (
	controller "resturant-managment/controllers"

	"github.com/gin-gonic/gin"
)

func OrderRoutes(routes *gin.Engine) {
	routes.GET("/Orders", controller.GetOrders())
	routes.GET("/Order/:order_id", controller.GetOrder())
	routes.POST("/Order/add", controller.AddOrder())
	routes.PATCH("/Order/update/:order_id", controller.UpdateOrder())
	routes.DELETE("/Order/delete/:order_id", controller.DeleteOrder())
}
