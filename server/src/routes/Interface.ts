import { Router } from 'express'
const router = Router()

// 导入控制器模块
const interface_controller = require('../controllers/Interface')

/// 用户路由 ///

router.get('/', interface_controller.check)
router.post('/create', interface_controller.create)
router.post('/modify', interface_controller.modify)
router.post('/remove', interface_controller.remove)

module.exports = router