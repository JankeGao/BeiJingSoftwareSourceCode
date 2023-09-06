using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using Bussiness.Contracts;
using Bussiness.Dtos;
using Bussiness.Entitys;
using Bussiness.Entitys.InterFace;
using Bussiness.Enums;
using HP.Core.Data;
using HP.Core.Mapping;
using HP.Core.Sequence;
using HP.Data.Orm;
using HP.Utility.Data;

namespace Bussiness.Services
{
    public class InServer : Contracts.IInContract
    {
        /// <summary>
        /// 入库单中间表
        /// </summary>
        public IRepository<InIF, int> InIFRepository { get; set; }
        public IRepository<InMaterialIF, int> InMaterialIFRepository { get; set; }
        public IRepository<Material, int> MaterialRepository { get; set; }
        public IRepository<In, int> InRepository { get; set; } 
        public IRepository<InMaterial, int> InMaterialRepository { get; set; }
        public IRepository<InMaterialLabel, int> InMaterialLabelRepository { get; set; }
        public IRepository<Entitys.Stock, int> StockRepository { get; set; }
        public IRepository<Entitys.Location, int> LocationRepository { get; set; }

        public IRepository<HPC.BaseService.Models.Dictionary,int> DictionaryRepository { get; set; }
        public IQuery<In> Ins => InRepository.Query();

        public IQuery<InMaterial> InMaterials => InMaterialRepository.Query();

        public ISequenceContract SequenceContract { set; get; }

        public ILabelContract LabelContract { set; get; }

        public ISupplyContract SupplyContract { set; get; }

        public ICheckContract CheckContract { get; set; }

        public IInTaskContract InTaskContract { get; set; }

        public IMaterialContract MaterialContract { get; set; }

        public IMapper Mapper { set; get; }

        /// <summary>
        /// 物料载具关联
        /// </summary>

        public IQuery<InMaterialDto> InMaterialDtos => InMaterials.InnerJoin(MaterialRepository.Query(), (inMaterial, material) => inMaterial.MaterialCode == material.Code)
            .InnerJoin(Ins,(inMaterial, material,ins)=>inMaterial.InCode==ins.Code)
            .LeftJoin(WareHouseContract.WareHouses, (inMaterial, material, ins, warehouse) => ins.WareHouseCode == warehouse.Code)
            .LeftJoin(SupplyContract.Supplys, (inMaterial, material, ins, warehouse,supply)=> inMaterial.SupplierCode==supply.Code)
            .Select((inMaterial, material, ins, warehouse, supply) => new Dtos.InMaterialDto
            {
            Id = inMaterial.Id,
            InCode = inMaterial.InCode,
            MaterialCode = inMaterial.MaterialCode,
            Quantity = inMaterial.Quantity,
            ManufactrueDate = inMaterial.ManufactrueDate,
            BatchCode = inMaterial.BatchCode,
            MaterialType= material.MaterialType,
            SupplierCode = inMaterial.SupplierCode,
            SupplierName = supply.Name,
            Status = inMaterial.Status,
            IsDeleted = inMaterial.IsDeleted,
            BillCode = inMaterial.BillCode,
            CustomCode = inMaterial.CustomCode,
            PackageQuantity= material.PackageQuantity,
            SendInQuantity= inMaterial.SendInQuantity,
            CustomName = inMaterial.CustomName,
            MaterialLabel = inMaterial.MaterialLabel,
            SuggestLocation = inMaterial.SuggestLocation,
            LocationCode = inMaterial.LocationCode,
            ShelfTime = inMaterial.ShelfTime,
            CreatedUserCode = inMaterial.CreatedUserCode,
            CreatedUserName = inMaterial.CreatedUserName,
            CreatedTime = inMaterial.CreatedTime,
            UpdatedUserCode = inMaterial.UpdatedUserCode,
            UpdatedUserName = inMaterial.UpdatedUserName,
            UpdatedTime = inMaterial.UpdatedTime,
            MaterialName = material.Name,
            MaterialUnit = material.Unit,
            ItemNo = inMaterial.ItemNo,
            WareHouseCode = ins.WareHouseCode,
            WareHouseName=warehouse.Name,
            RealInQuantity =inMaterial.RealInQuantity,
            ValidityDate=inMaterial.ValidityDate,
            });

        public IRepository<Entitys.DpsInterface, int> DpsInterfaceRepository { get; set; }
        public IRepository<Entitys.DpsInterfaceMain, int> DpsInterfaceMainRepository { get; set; }
        public IQuery<InDto> InDtos {
            get {
               return Ins
                    .LeftJoin(DictionaryRepository.Query(), (inentity, dictionary) => inentity.InDict == dictionary.Code)
                    .LeftJoin(WareHouseContract.WareHouses, (inentity, dictionary, warehouse) => inentity.WareHouseCode == warehouse.Code)
                    .Select((inentity, dictionary, warehouse) => new Dtos.InDto()
                    {
                       Id=inentity.Id,
                       Code=inentity.Code,
                       BillCode=inentity.BillCode,
                       WareHouseCode= inentity.WareHouseCode,
                       WareHouseName=warehouse.Name,
                       InDict= inentity.InDict,
                       Status= inentity.Status,
                       Remark = inentity.Remark,
                       IsDeleted= inentity.IsDeleted,
                       BillFields= inentity.BillFields,
                       ShelfStartTime=inentity.ShelfStartTime,
                       ShelfEndTime= inentity.ShelfEndTime,
                       CreatedUserCode = inentity.CreatedUserCode,
                       CreatedUserName = inentity.CreatedUserName,
                       CreatedTime = inentity.CreatedTime,
                       UpdatedUserCode = inentity.UpdatedUserCode,
                       UpdatedUserName = inentity.UpdatedUserName,
                       UpdatedTime = inentity.UpdatedTime,
                       InDictDescription = dictionary.Name,
                       InDate = inentity.InDate,
                       PickOrderCode = inentity.PickOrderCode,
                       OrderType = inentity.OrderType
                    });
            }

        }

        public IWareHouseContract WareHouseContract { get; set; }


        /// <summary>
        /// 轮训接口--创建WMS入库单
        /// </summary>
        /// <param name="entity"></param>
        public DataResult CreateInEntityInterFace()
        {
            try
            {
                InIFRepository.UnitOfWork.TransactionEnabled = true;
                var list = InIFRepository.Query().Where(a => a.Status == (int)InterFaceBCaption.Waiting).ToList();
                int count = 0;
                foreach (var item in list)
                {
                    // 判断该来源单据号是否已存在入库单
                    if (Ins.Any(a => a.BillCode == item.BillCode))
                    {
                        item.Status = (int)OrderEnum.Error;
                        item.Remark = "来源单据号" + item.BillCode + "已存在";
                        InIFRepository.Update(item);
                        break;
                    }
                    int errorflag = 0;
                    var inEnity = new In()
                    {
                        BillCode = item.BillCode,
                        WareHouseCode = item.WareHouseCode,
                        InDict = item.InDict,
                        InDate = item.InDate,
                        Status = (int)InStatusCaption.WaitingForShelf,
                        AddMaterial = new List<Bussiness.Entitys.InMaterial>(),
                        OrderType = (int)OrderTypeEnum.Other,
                        //Remark = item.Remark
                    };
                    var materialList = InMaterialIFRepository.Query().Where(a => a.BillCode == item.BillCode).ToList();
                    foreach (var inMaterial in materialList)
                    {
                        inMaterial.Status = (int)OrderEnum.Wait;
                        if (MaterialContract.Materials.FirstOrDefault(a => a.Code == inMaterial.MaterialCode) == null)
                        {
                            item.Status = (int)OrderEnum.Error;
                            errorflag = 1;
                            inMaterial.Status = (int)OrderEnum.Error;
                            inMaterial.Remark = "物料编码" + inMaterial.MaterialCode + "不存在!";
                            InMaterialIFRepository.Update(inMaterial);
                            break;
                        }

                        var inMaterialEntity = new InMaterial()
                        {
                            BillCode = inMaterial.BillCode,
                            Status = 0,
                            InDict = inMaterial.InDict,
                            SendInQuantity = 0,
                            MaterialCode = inMaterial.MaterialCode,
                            Quantity = inMaterial.Quantity,
                            ManufactrueDate = inMaterial.ManufactrueDate,
                            BatchCode = inMaterial.BatchCode,
                            SupplierCode = inMaterial.SupplierCode,
                            SupplierName = inMaterial.SupplierName,
                            ItemNo = inMaterial.ItemNo
                        };
                        inEnity.AddMaterial.Add(inMaterialEntity);
                        InMaterialIFRepository.Update(inMaterial);
                    }

                    if (errorflag == 1)
                    {
                        InIFRepository.Update(item);
                    }
                    else
                    {
                        if (!CreateInEntity(inEnity).Success)
                        {
                            return DataProcess.Failure("该入库单号已存在");
                        }
                        item.Status = (int)OrderEnum.Wait;
                        InIFRepository.Update(item);
                        count = count + 0;
                    }
                }
                InIFRepository.UnitOfWork.Commit();
                return DataProcess.Success(string.Format("入库单同步成功,共有{0}条增加", count));
            }
            catch (Exception ex)
            {
                return null;
            }
        }


        public DataResult CreateInEntity(In entity)
        {
            InRepository.UnitOfWork.TransactionEnabled = true;
            {
                // 判断是否有入库单号
                if (String.IsNullOrEmpty(entity.Code))
                {
                    entity.Code = SequenceContract.Create(entity.GetType());
                }
                if (Ins.Any(a => a.Code == entity.Code))
                {
                    return DataProcess.Failure("该入库单号已存在");
                }
                foreach (var inMaterial in entity.AddMaterial)
                {
                    if (!Regex.IsMatch(inMaterial.Quantity.ToString(), @"^[0-9]*(\.[0-9]{1,2})?$"))
                    {
                        return DataProcess.Failure("请输入正确的数字格式（包含两位小数的数字或者不包含小数的数字）");
                    }
                }
                entity.Status = entity.Status == null ? 0 : entity.Status; // 手动入库，状态为已完成
                entity.OrderType= entity.OrderType == null ? 0 : entity.OrderType; // 单据来源

                if (!InRepository.Insert(entity))
                {
                    return DataProcess.Failure(string.Format("入库单{0}新增失败", entity.Code));
                }

                if (entity.AddMaterial != null && entity.AddMaterial.Count() > 0)
                {
                    foreach (InMaterial item in entity.AddMaterial)
                    {
                        item.InCode = entity.Code;
                        item.BillCode = entity.BillCode;
                        item.SendInQuantity = item.SendInQuantity.GetValueOrDefault(0)==0? 0 : item.SendInQuantity;
                        item.Status = item.Status == null ? 0 : item.Status;
                        item.InDict = entity.InDict;
                        item.ItemNo =(entity.AddMaterial.IndexOf(item)+1).ToString();
                        DataResult result = CreateInMaterialEntity(item);
                        if (!result.Success)
                        {
                            return DataProcess.Failure(result.Message);
                        }
                    }
                }
            }
            InRepository.UnitOfWork.Commit();

            return DataProcess.Success(string.Format("入库单{0}新增成功", entity.Code));
        }

        public DataResult CreateInMaterialEntity(InMaterial entity)
        {

            if (!string.IsNullOrEmpty(entity.ManufactrueDate.ToString()))
            {
                // 计算该物料到期日期
                if (MaterialContract.MaterialRepository.GetEntity(a => a.Code == entity.MaterialCode).ValidityPeriod > 0)
                {
                    var days = MaterialContract.MaterialRepository.GetEntity(a => a.Code == entity.MaterialCode)
                        .ValidityPeriod;
                    
                    entity.ValidityDate = entity.ManufactrueDate.Value.AddDays(days);
                }
            }

            try
            {
                if (InMaterialRepository.Insert(entity))
                {
                    return DataProcess.Success(string.Format("入库物料{0}新增成功", entity.MaterialLabel));
                }
            }
            catch (System.Exception ex)
            {
                return DataProcess.Failure("操作失败");
            }
            return DataProcess.Failure("操作失败");
        }

        public DataResult RemoveInMaterial(int id)
        {
            InMaterial entity = InMaterialRepository.GetEntity(id);
            if (entity.Status != (int)Enums.InStatusCaption.WaitingForShelf)
            {
                return DataProcess.Failure("该入库物料条码执行中或已完成");
            }
            if (InMaterialRepository.Delete(id) > 0)
            {
                return DataProcess.Success(string.Format("入库条码{0}删除成功", entity.MaterialLabel));
            }
            return DataProcess.Failure("操作失败");
        }

        public DataResult RemoveIn(int id)
        {
            In entity = InRepository.GetEntity(id);
            if (entity.Status != (int)Enums.InStatusCaption.WaitingForShelf)
            {
                return DataProcess.Failure("该入库单执行中或已完成");
            }

            InRepository.UnitOfWork.TransactionEnabled = true;
            if (entity.Status != (int)Enums.InStatusCaption.WaitingForShelf)
            {
                return DataProcess.Failure("该入库单执行中或已完成");
            }
            if (InRepository.Delete(id) <= 0)
            {
                return DataProcess.Failure(string.Format("入库单{0}删除失败", entity.Code));
            }
            List<InMaterial> list = InMaterials.Where(a => a.InCode == entity.Code).ToList();
            if (list != null && list.Count > 0)
            {
                foreach (InMaterial item in list)
                {
                    DataResult result = RemoveInMaterial(item.Id);
                    if (!result.Success)
                    {
                        return DataProcess.Failure(result.Message);
                    }
                }
            }
            InRepository.UnitOfWork.Commit();
            return DataProcess.Success("操作成功");
        }


        public DataResult CancelInMaterial(int id)
        {
            InMaterial entity = InMaterialRepository.GetEntity(id);
            if (entity.Status != (int)Enums.InStatusCaption.WaitingForShelf)
            {
                return DataProcess.Failure("该入库物料条码执行中或已完成");
            }
            if (InMaterialRepository.Delete(id) > 0)
            {
                return DataProcess.Success(string.Format("入库条码{0}删除成功", entity.MaterialLabel));
            }
            return DataProcess.Failure("操作失败");
        }

        /// <summary>
        /// 作废入库单
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public DataResult CancelIn(In entity)
        {

            if (InTaskContract.InTasks.Any(a => a.InCode == entity.Code && a.Status != (int)InTaskStatusCaption.WaitingForShelf))
            {
                return DataProcess.Failure(string.Format("该入库单存在执行中或已完成的入库任务，无法作废"));
            }

            entity.Status = (int) InStatusCaption.Cancel;
            InRepository.UnitOfWork.TransactionEnabled = true;

            //作废入库单
            if (InRepository.Update(entity) <= 0)
            {
                return DataProcess.Failure(string.Format("入库单{0}作废失败", entity.Code));
            }

            //作废入库物料
            List<InMaterial> list = InMaterials.Where(a => a.InCode == entity.Code).ToList();
            if (list != null && list.Count > 0)
            {
                foreach (InMaterial item in list)
                {
                    item.Status = (int)InStatusCaption.Cancel;
                    if (InMaterialRepository.Update(item) <= 0)
                    {
                        return DataProcess.Failure(string.Format("入库单{0}作废失败", entity.Code));
                    }
                }
            }

            //作废入库任务单
            List<InTask> tasklist = InTaskContract.InTasks.Where(a => a.InCode == entity.Code).ToList();
            if (tasklist != null && tasklist.Count > 0)
            {
                foreach (InTask item in tasklist)
                {
                    item.Status = (int)InTaskStatusCaption.Cancel;
                    if (InTaskContract.InTaskRepository.Update(item) <= 0)
                    {
                        return DataProcess.Failure(string.Format("入库任务单{0}作废失败", entity.Code));
                    }
                }
            }

            //作废入库任务明细
            List<InTaskMaterialDto> taskMaterallist = InTaskContract.InTaskMaterialDtos.Where(a => a.InCode == entity.Code).ToList();
            if (taskMaterallist != null && taskMaterallist.Count > 0)
            {
                foreach (InTaskMaterialDto item in taskMaterallist)
                {
                    item.Status = (int)InTaskStatusCaption.Cancel;
                    // 物料实体映射
                    InTaskMaterial inTaskEntity = Mapper.MapTo<InTaskMaterial>(item);
                    if (InTaskContract.InTaskMaterialRepository.Update(inTaskEntity) <= 0)
                    {
                        return DataProcess.Failure(string.Format("入库任务单明细{0}作废失败", item.MaterialCode));
                    }

                    // 解除托盘的重量锁定
                    //  托盘实体
                    var trayEntity = WareHouseContract.TrayWeightMapRepository.GetEntity(a => a.TrayId == item.SuggestTrayId);
                    trayEntity.TempLockWeight = trayEntity.TempLockWeight - item.Quantity * item.UnitWeight;

                    // 更新托盘储位推荐锁定的重量
                    if (WareHouseContract.TrayWeightMapRepository.Update(trayEntity) <= 0)
                    {
                        return DataProcess.Failure(string.Format("托盘重量锁定失败"));
                    }

                    // 释放储位锁定数量
                    var locationEntity = WareHouseContract.Locations
                        .Where(a => a.Code == item.SuggestLocation)
                        .FirstOrDefault();

                    // 释放该储位的数量
                    locationEntity.LockQuantity = locationEntity.LockQuantity - item.Quantity;
                    if (locationEntity.LockQuantity==0)
                    {
                        locationEntity.LockMaterialCode = "";
                    }
                    locationEntity.IsLocked = false;
                    // 更新托盘储位推荐锁定的重量
                    if (WareHouseContract.LocationRepository.Update(locationEntity) <= 0)
                    {
                        return DataProcess.Failure(string.Format("储位数量锁定失败"));
                    }
                }
            }


            if (entity.OrderType == (int)OrderTypeEnum.Other)
            {
                var ifIn = InIFRepository.Query().FirstOrDefault(a => a.BillCode == entity.BillCode);
                if (ifIn != null)
                {
                    ifIn.Status = 3;//作废
                    InIFRepository.Update(ifIn);
                    InMaterialIFRepository.Update(a => new InMaterialIF() { Status = 3 }, p => p.BillCode == entity.BillCode);
                }
            }

            //作废时更新  接口状态
            InRepository.UnitOfWork.Commit();
            return DataProcess.Success("作废成功");
        }

        public DataResult EditIn(In entity)
        {
            InRepository.UnitOfWork.TransactionEnabled = true;
            if (InRepository.Update(entity) <= 0)
            {
                return DataProcess.Failure(string.Format("入库单{0}编辑失败", entity.Code));
            }

            List<InMaterial> list = InMaterials.Where(a => a.InCode == entity.Code).ToList();
            if (list != null && list.Count > 0)
            {
                foreach (InMaterial item in list)
                {
                    DataResult result = RemoveInMaterial(item.Id);
                    if (!result.Success)
                    {
                        return DataProcess.Failure(result.Message);
                    }
                }
            }

            if (entity.AddMaterial != null && entity.AddMaterial.Count() > 0)
            {
                foreach (InMaterial item in entity.AddMaterial)
                {
                    item.InCode = entity.Code;
                    item.BillCode = entity.BillCode;
                    item.Status = 0;
                    item.SendInQuantity = 0;
                    item.InDict = entity.InDict;
                    DataResult result = CreateInMaterialEntity(item);
                    if (!result.Success)
                    {
                        return DataProcess.Failure(result.Message);
                    }
                }
            }
            InRepository.UnitOfWork.Commit();
            return DataProcess.Success("编辑成功");
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="entityDto"></param>
        /// <returns></returns>
        public DataResult ForceFinish(In entity)
        {
            return DataProcess.Success("强制中止成功！");
        }


        public DataResult HandShelf(InMaterial entity)
        {

            if (entity.Status != (int)Bussiness.Enums.InStatusCaption.WaitingForShelf&& entity.Status != (int)Bussiness.Enums.InStatusCaption.Sheling)
            {
                return DataProcess.Failure("该物料条码状态不为待上架或执行中");
            }
            In inEntity = Ins.FirstOrDefault(a => a.Code == entity.InCode);
            //if (inEntity.Status != (int)Bussiness.Enums.InStatusCaption.WaitingForShelf && inEntity.Status != (int)Bussiness.Enums.InStatusCaption.HandShelf)
            //{
            //    return DataProcess.Failure("入库单状态不为待上架或者手动执行中");
            //}
            if (inEntity.Status != (int)Bussiness.Enums.InStatusCaption.WaitingForShelf && inEntity.Status != (int)Bussiness.Enums.InStatusCaption.HandShelf && inEntity.Status != (int)Bussiness.Enums.InStatusCaption.Sheling)
            {
                return DataProcess.Failure("入库单状态不为待上架或者手动执行中");
            }
            if (string.IsNullOrEmpty(entity.LocationCode))
            {
                return DataProcess.Failure("尚未选择上架库位");
            }
            Location location = LocationRepository.Query().FirstOrDefault(a => a.Code == entity.LocationCode);
            if (location == null)
            {
                return DataProcess.Failure(string.Format("系统不存在该上架库位{0}", entity.LocationCode));
            }
            //if (StockRepository.Query().Any(a=>a.MaterialLabel==entity.MaterialLabel))
            //{
            //    return DataProcess.Failure(string.Format("库存已存在该物料条码{0}", entity.MaterialLabel));
            //}

            var stock = StockRepository.Query().FirstOrDefault(a => a.MaterialLabel == entity.MaterialLabel && a.LocationCode == location.Code);
            bool IsExistStock = false;
            entity.Status = (int)Bussiness.Enums.InStatusCaption.Finished;
            entity.ShelfTime = DateTime.Now;

            if (stock==null)
            {
                stock = new Stock
                {
                    AreaCode = location.ContainerCode,
                    BatchCode = entity.BatchCode,
                    BillCode = entity.BillCode,
                    CreatedTime = DateTime.Now,
                    CustomCode = entity.CustomCode,
                    CustomName = entity.CustomName,
                    InCode = entity.InCode,
                    IsLocked = false,
                    LocationCode = entity.LocationCode,
                    ManufactureBillNo = "",
                    ManufactureDate = string.IsNullOrEmpty(entity.ManufactrueDate.ToString()) ? DateTime.Now : entity.ManufactrueDate,
                    WareHouseCode = location.WareHouseCode,
                    MaterialCode = entity.MaterialCode,
                    MaterialLabel = entity.MaterialLabel,
                    SupplierCode=entity.SupplierCode,
                    MaterialStatus = 0,
                    Quantity = entity.Quantity,
                    SaleBillItemNo = "",
                    SaleBillNo = "",
                    StockStatus = 0,
                    LockedQuantity = 0
                };
            }
            else
            {
                IsExistStock = true;
                stock.Quantity = stock.Quantity + entity.Quantity;
            }
         

            if (inEntity.Status== (int)Bussiness.Enums.InStatusCaption.WaitingForShelf)
            {
                inEntity.ShelfStartTime = DateTime.Now;
                inEntity.Status = (int)Bussiness.Enums.InStatusCaption.HandShelf;
            }
            InMaterialRepository.UnitOfWork.TransactionEnabled = true;

            if (!InMaterialDtos.Where(a=>a.InCode==inEntity.Code && a.Id!=entity.Id).Any(a=>a.Status!=(int)Bussiness.Enums.InStatusCaption.Finished))
            {
                inEntity.Status = (int)Bussiness.Enums.InStatusCaption.Finished;
                inEntity.ShelfEndTime = DateTime.Now;

            }

            InMaterialRepository.Update(entity);
            InRepository.Update(inEntity);
            if (IsExistStock)
            {
                StockRepository.Update(stock);
            }
            else
            {
                StockRepository.Insert(stock);
            }
            InMaterialRepository.UnitOfWork.Commit();
            return DataProcess.Success("上架成功");
        }

        /// <summary>
        /// 发送亮灯任务
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public DataResult SendOrderToPTL(In entity)
        {
            try
            {
                //存在盘点计划 不允许发送

                if (CheckContract.Checks.Any(a=>a.Status<6 && a.WareHouseCode==entity.WareHouseCode))
                {
                    return DataProcess.Failure("该仓库尚有盘点计划,此时不允许发送PTL任务");
                }

                if (entity.Status != (int)(Bussiness.Enums.InStatusCaption.WaitingForShelf))
                {
                    return DataProcess.Failure("入库单状态不对,应为待上架状态");
                }

                //if (Ins.Any(a => a.Status == (int)Bussiness.Enums.InStatusCaption.Sheling))
                //{
                //    return DataProcess.Failure("入库单已发送至PTL");
                //}
                InRepository.UnitOfWork.TransactionEnabled = true;
                entity.Status = (int)Bussiness.Enums.InStatusCaption.Sheling;
                List<InMaterialDto> list = InMaterialDtos.Where(a => a.InCode == entity.Code && a.Status == (int)Bussiness.Enums.InStatusCaption.WaitingForShelf).ToList();
                List<InMaterial> list1 = InMaterials.Where(a => a.InCode == entity.Code && a.Status == (int)Bussiness.Enums.InStatusCaption.WaitingForShelf).ToList();

                DpsInterfaceMain main = new DpsInterfaceMain();
                main.ProofId = Guid.NewGuid().ToString();
                main.CreateDate = DateTime.Now;
                main.Status = 0;
                main.OrderType = 0;
                main.OrderCode = entity.Code;
                if (InRepository.Update(entity) < 0)
                {
                    return DataProcess.Failure("更新失败");
                }
                foreach (InMaterialDto item in list)
                {
                    InMaterial inMaterial = list1.FirstOrDefault(a => a.Id == item.Id);
                    inMaterial.Status = (int)Bussiness.Enums.InStatusCaption.Sheling;

                    DpsInterface dpsInterface = new DpsInterface();
                    dpsInterface.BatchNO = item.BatchCode;
                    dpsInterface.CreateDate = DateTime.Now;
                    dpsInterface.GoodsName = item.MaterialName;
                    dpsInterface.LocationId = item.LocationCode;
                    dpsInterface.MakerName = item.SupplierName;
                    dpsInterface.MaterialLabelId = 0;
                    dpsInterface.ProofId = main.ProofId;
                    dpsInterface.Quantity = Convert.ToInt32(item.Quantity);
                    dpsInterface.RealQuantity = 0;
                    dpsInterface.RelationId = item.Id;
                    dpsInterface.Spec = item.MaterialUnit;
                    dpsInterface.Status = 0;
                    dpsInterface.OrderCode = item.InCode;
                    dpsInterface.ToteId = item.MaterialLabel;
                    if (DpsInterfaceRepository.Insert(dpsInterface) == false)
                    {
                        return DataProcess.Failure("发送任务至PTL失败");
                    }
                    if (InMaterialRepository.Update(inMaterial) < 0)
                    {
                        return DataProcess.Failure("更新失败");
                    }
                }
                if (DpsInterfaceMainRepository.Insert(main)==false)
                {
                    return DataProcess.Failure("发送任务至PTL失败");
                }
                InRepository.UnitOfWork.Commit();
            }
            catch (Exception ex)
            {

                return DataProcess.Failure("发送任务至PTL失败:"+ex.Message);
            }

            return DataProcess.Success("发送PTL成功");

        }
    }
}
