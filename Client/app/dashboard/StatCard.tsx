interface StatCardProps {
  title: string;
  primaryIcon: React.ReactNode;
  details: {
    title: string;
    amount: string;
    changePercentage: number;
    IconComponent: React.ComponentType<{ className: string }>;
  }[];
  dateRange: string;
}

const StatCard = ({ title, primaryIcon, details, dateRange }: StatCardProps) => {
    const formatPercentage = (value: number) => {
      const signal = value >= 0 ? "+" : "";
      return `${signal}${value.toFixed()}%`;
    };
  
    const getChangeColor = (value: number) => (value >= 0 ? "text-green-500" : "text-red-500");
  
    return (
      <div className="bg-white shadow-lg rounded-xl p-5 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-gray-800">{title}</h2>
          <span className="text-sm text-gray-400">{dateRange}</span>
        </div>
        <hr />
        <div className="flex items-center gap-6 mt-4">
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-full">
            {primaryIcon}
          </div>
          <div className="flex-1">
            {details.map((detail, index) => (
              <div key={index} className="flex justify-between items-center mb-4">
                <div className="text-gray-600">{detail.title}</div>
                <div className="font-semibold text-gray-800">{detail.amount}</div>
                <div className="flex items-center">
                  <detail.IconComponent
                    className={`w-5 h-5 mr-2 ${getChangeColor(detail.changePercentage)}`}
                  />
                  <span className={`font-medium ${getChangeColor(detail.changePercentage)}`}>
                    {formatPercentage(detail.changePercentage)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  export default StatCard;
  