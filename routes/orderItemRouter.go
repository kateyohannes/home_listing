package routes

import (
	controller "resturant-managment/controllers"

	"github.com/gin-gonic/gin"
)

func OrderItemRoutes(routes *gin.Engine) {
	routes.GET("/orderItems", controller.GetOrderItems())
	routes.GET("/orderItem/:orderItem_id", controller.GetOrderItem())
	routes.POST("/orderItem/add", controller.AddOrderItem())
	routes.PATCH("/orderItem/update/:orderItem_id", controller.UpdateOrderItem())
	routes.DELETE("/orderItem/delete/:orderItem_id", controller.DeleteOrderItem())
}
