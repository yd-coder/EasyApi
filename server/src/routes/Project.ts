import { Router } from 'express'
const router = Router()

// 导入控制器模块
const project_controller = require('../controllers/Project')

/// 用户路由 ///

router.post('/create', project_controller.create)
router.post('/modify', project_controller.modify)
router.post('/remove', project_controller.remove)
// router.post('/find', project_controller.find)

module.exports = router
