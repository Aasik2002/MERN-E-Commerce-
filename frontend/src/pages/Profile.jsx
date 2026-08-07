import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ShieldCheck, LogOut, Package, ArrowRight, Edit2, Save, X, Camera } from 'lucide-react';
import { useGetProfileQuery, useLogoutUserMutation, useUpdateProfileMutation } from '../redux/api/authApi';
import toast from 'react-hot-toast';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const navigate = useNavigate();
  const { data, isLoading, refetch } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [logoutUser] = useLogoutUserMutation();

  const user = data?.user;

  const handleEditClick = () => {
    setName(user?.name || '');
    setAvatarPreview(user?.avatar?.url || '');
    setIsEditing(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      if (avatar) {
        formData.append('avatar', avatar);
      }

      const result = await updateProfile(formData).unwrap();
      if (result.success) {
        toast.success("Profile updated successfully!", {
          style: { background: '#0b1021', color: '#fff', border: '1px solid #1e293b' },
        });
        setIsEditing(false);
        window.location.reload(); 
      }
    } catch (err) {
      console.error("Update Failed:", err);
      toast.error(err?.data?.message || "Failed to update profile", {
        style: { background: '#0b1021', color: '#fff', border: '1px solid #1e293b' },
      });
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      toast.success("Logged out successfully", {
        style: { background: '#0b1021', color: '#fff', border: '1px solid #1e293b' },
      });
      refetch();
      navigate('/login');
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Logout failed", {
        style: { background: '#0b1021', color: '#fff', border: '1px solid #1e293b' },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#060913] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#060913] pt-28 pb-16 px-4 sm:px-6 lg:px-8 font-sans text-white">
      
      {/* Background Glows */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-[#0b1021]/80 backdrop-blur-xl border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl gap-4">
          
          <div className="flex items-center gap-5">
            {/* Avatar Display & Upload */}
            <div className="relative group">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-2xl font-bold shadow-lg shadow-blue-600/30 overflow-hidden border border-slate-700">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                ) : user?.avatar?.url ? (
                  <img src={user.avatar.url} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  user?.name ? user.name.charAt(0).toUpperCase() : 'U'
                )}
              </div>

              {isEditing && (
                <label htmlFor="avatar-input" className="absolute inset-0 bg-black/60 rounded-2xl flex flex-col items-center justify-center cursor-pointer text-white opacity-90 hover:opacity-100 transition-opacity">
                  <Camera size={20} />
                  <span className="text-[10px] mt-1 font-semibold">Change</span>
                  <input 
                    id="avatar-input" 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageChange} 
                  />
                </label>
              )}
            </div>
            
            <div>
              {isEditing ? (
                <form onSubmit={handleUpdate} className="space-y-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-[#060913] border border-slate-700 px-3 py-1.5 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 w-full"
                    required
                  />
                  <div className="flex items-center gap-2">
                    <button type="submit" disabled={isUpdating} className="flex items-center gap-1 text-xs bg-blue-600 hover:bg-blue-500 px-3 py-1.5 rounded-lg font-bold transition-all">
                      <Save size={14} /> Save
                    </button>
                    <button type="button" onClick={() => setIsEditing(false)} className="flex items-center gap-1 text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg font-bold transition-all text-slate-300">
                      <X size={14} /> Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-extrabold tracking-tight">{user?.name || 'User Profile'}</h1>
                  <button onClick={handleEditClick} className="text-blue-400 hover:text-blue-300 transition-colors p-1.5 bg-slate-900 border border-slate-800 rounded-lg" title="Edit Profile">
                    <Edit2 size={14} />
                  </button>
                </div>
              )}
              
              {!isEditing && (
                <p className="text-sm text-slate-400 flex items-center gap-1.5 mt-1">
                  <Mail size={14} /> {user?.email}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all cursor-pointer"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Account Status Card */}
          <div className="bg-[#0b1021]/80 backdrop-blur-xl border border-slate-800 p-6 rounded-3xl shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-slate-200 flex items-center gap-2">
              <ShieldCheck className="text-blue-500" size={20} /> Account Security
            </h3>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex justify-between py-2 border-b border-slate-800/80">
                <span className="text-slate-400">Role</span>
                <span className="font-semibold uppercase tracking-wider text-blue-400">{user?.role || 'Customer'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800/80">
                <span className="text-slate-400">Verification Status</span>
                <span className="font-semibold text-green-400">Verified System Access</span>
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-[#0b1021]/80 backdrop-blur-xl border border-slate-800 p-6 rounded-3xl shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-slate-200 flex items-center gap-2">
              <Package className="text-blue-500" size={20} /> Quick Operations
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Manage your orders, check product delivery status, or modify your system preferences.
            </p>
            <button 
              onClick={() => navigate('/products')}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-all cursor-pointer"
            >
              Browse Products <ArrowRight size={16} />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;