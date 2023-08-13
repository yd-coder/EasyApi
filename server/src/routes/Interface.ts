import { Router } from 'express'
const router = Router()

// 导入控制器模块
const interface_controller = require('../controllers/Interface')

/// 用户路由 ///

router.get('/:projectId', interface_controller.check)
router.post('/', interface_controller.create)
router.put('/', interface_controller.modify)
router.delete('/', interface_controller.remove)

module.exports = router
