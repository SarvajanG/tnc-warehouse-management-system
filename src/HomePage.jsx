import './HomePage.css';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

export default function HomePage() {
  return (
    <div className="auth-container">
      <div className="item-container">
        <button className="auth-button">SCAN IN</button>
        <button className="auth-button">SCAN OUT</button>
        <button className="auth-button">View Inventory</button>
        <ManageAccountsIcon/>
      </div>
    </div>
  );
}
