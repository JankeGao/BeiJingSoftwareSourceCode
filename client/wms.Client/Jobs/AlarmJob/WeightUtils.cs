using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GalaSoft.MvvmLight;

namespace wms.Client.Jobs.AlarmJob
{
    public class WeightUtils : ObservableObject
    {
        /// <summary>
        /// 获取物料重量
        /// </summary>
        public decimal WeighingQuantity
        {
            get { return weighingAmount; }
            set { weighingAmount = value; RaisePropertyChanged(); }
        }
        private decimal weighingAmount;
    }
}
