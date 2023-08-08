// 全局声明 *.module.scss 模块的类型
declare module '*.module.scss' {
    const styles: { [className: string]: string };
    export default styles;
}