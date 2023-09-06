using System;
using System.ComponentModel;

namespace wms.Client.Model.Entity
{
    public class RunningContainer
    {
        /// <summary>
        /// 货架编码
        /// </summary>
        public string ContainerCode { get; set; }
        /// <summary>
        /// 托盘序号
        /// </summary>
        public int TrayCode { get; set; }
        /// <summary>
        /// X轴灯号
        /// </summary>
        public int XLight { get; set; }

        public int YLight { get; set; }

        public string IpAddress { get; set; }

        public int Port { get; set; }
        /// <summary>
        /// 类型 0普通货柜 1卡迪斯 2亨乃尔 3 垂直回转柜 
        /// </summary>
        public int ContainerType { get; set; }
        /// <summary>
        /// 上一次运转货柜
        /// </summary>
        public string LastTrayCode { get; set; }

        public int XLenght { get; set; }
    }
}
