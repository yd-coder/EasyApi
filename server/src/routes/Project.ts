import { Router } from 'express'
const router = Router()

// 导入控制器模块
const project_controller = require('../controllers/Project')

/// 用户路由 ///

router.get('/', project_controller.check)
router.get('/:projectId', project_controller.check)
router.post('/', project_controller.create)
router.put('/', project_controller.modify)
router.delete('/', project_controller.remove)

module.exports = router
